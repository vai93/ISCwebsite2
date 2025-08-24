const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const closeBtn = document.getElementById("sidebarClose");

toggleBtn.addEventListener("click", () => sidebar.classList.add("show"));
closeBtn.addEventListener("click", () => sidebar.classList.remove("show"));

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.classList.remove("show");
  }
});

const cards = document.querySelectorAll(".welding-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.remove("hover-out");
    card.classList.add("hover-in");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover-in");
    card.classList.add("hover-out");
  });
});

function renderJobListings(jobsData) {
  const accordionContainer = document.getElementById("careerAccordion");

  if (!jobsData || jobsData.length === 0) {
    accordionContainer.innerHTML =
      '<p class="text-center text-muted">No openings are available at the moment, but we are always looking for talented people. Please check back later.</p>';
    return;
  }

  let accordionHTML = "";
  jobsData.forEach((job, index) => {
    const isFirst = index === 0;
    const collapseId = `job${index}`;
    const headingId = `heading${index}`;

    let responsibilitiesHTML = "";
    if (job["Key Responsibilities"]) {
      const responsibilities = String(job["Key Responsibilities"])
        .split(";")
        .filter((r) => r.trim() !== "");
      if (responsibilities.length > 0) {
        responsibilitiesHTML += `<h6>Key Responsibilities:</h6><ul>`;
        responsibilities.forEach((responsibility) => {
          responsibilitiesHTML += `<li>${responsibility.trim()}</li>`;
        });
        responsibilitiesHTML += `</ul>`;
      }
    }

    accordionHTML += `
                    <div class="accordion-item fade-in" style="transition-delay: ${
                      index * 0.2
                    }s;">
                        <h2 class="accordion-header" id="${headingId}">
                            <button class="accordion-button ${
                              isFirst ? "" : "collapsed"
                            }" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isFirst}" aria-controls="${collapseId}">
                                <div class="job-title-wrapper">
                                    <h5>${job.heading || "N/A"}</h5>
                                    <span class="job-meta">${
                                      job.subheading || ""
                                    }</span>
                                </div>
                                <i class="fas ${
                                  isFirst ? "fa-caret-up" : "fa-caret-down"
                                } accordion-icon"></i>
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse ${
      isFirst ? "show" : ""
    }" aria-labelledby="${headingId}" data-bs-parent="#careerAccordion">
                            <div class="accordion-body">
                                ${
                                  job["Job Description"]
                                    ? `<h6>Job Description:</h6><p>${job["Job Description"]}</p>`
                                    : ""
                                }
                                ${responsibilitiesHTML}
                                <button class="btn apply-now-btn" data-job-title="${
                                  job.heading || ""
                                }">
                                    <i class="fas fa-paper-plane me-2"></i>Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                `;
  });
  accordionContainer.innerHTML = accordionHTML;
}

function setupEventListeners() {
  document.querySelectorAll(".apply-now-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobTitle = btn.dataset.jobTitle;
      document.getElementById("position").value = jobTitle;
      document
        .getElementById("applynow")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const accordionItems = document.querySelectorAll(".accordion-collapse");
  accordionItems.forEach((item) => {
    const headerButton = item.previousElementSibling.querySelector("button");
    const icon = headerButton.querySelector(".accordion-icon");

    item.addEventListener("show.bs.collapse", () => {
      icon.classList.remove("fa-caret-down");
      icon.classList.add("fa-caret-up");
    });

    item.addEventListener("hide.bs.collapse", () => {
      icon.classList.remove("fa-caret-up");
      icon.classList.add("fa-caret-down");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

async function loadJobsAndInitialize() {
  const filePath = "js/jobs_data.xlsx";
  const applySection = document.getElementById("applynow");

  try {
    const response = await fetch(filePath);
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jobsData = XLSX.utils.sheet_to_json(worksheet);

    if (!jobsData || jobsData.length === 0) {
      applySection.style.display = "none";
    }

    renderJobListings(jobsData);
    setupEventListeners();
  } catch (error) {
    console.error("Error loading job data:", error);
    const accordionContainer = document.getElementById("careerAccordion");
    accordionContainer.innerHTML = `<p class="text-center text-danger">Could not load job openings. Please ensure the 'jobs_data.xlsx' file is in the correct folder.</p>`;
    applySection.style.display = "none";
  }
}

function initializeStaticHandlers() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  const fileInput = document.getElementById("resume");
  const filenameDisplay = document.querySelector(".file-upload-filename");
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      filenameDisplay.textContent = fileInput.files[0].name;
    } else {
      filenameDisplay.textContent = "No file selected...";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeStaticHandlers();
  loadJobsAndInitialize();
});
