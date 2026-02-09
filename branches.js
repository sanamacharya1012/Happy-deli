let branchesData = [];

function createBranchCard(branch) {
  const preview = branch.coverage.slice(0, 4).join(", ");
  const full = branch.coverage.slice(4).join(", ");

  const card = document.createElement("div");
  card.className = "branch-card";
  card.innerHTML = `
    <h3>${branch.name}</h3>
    <p><strong>Municipality:</strong> ${branch.municipality}</p>
    <p><strong>District:</strong> ${branch.district}</p>
    <p>
      <strong>Coverage:</strong> 
      <span class="coverage-preview">${preview}</span>
      <span class="coverage-full" style="display:none;">${full ? ", " + full : ""}</span>
    </p>
    ${full ? '<a href="javascript:void(0);" class="see-more-btn">See More</a>' : ""}
  `;

  const btn = card.querySelector(".see-more-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const fullSpan = card.querySelector(".coverage-full");
      if (fullSpan.style.display === "none") {
        fullSpan.style.display = "inline";
        btn.textContent = "See Less";
      } else {
        fullSpan.style.display = "none";
        btn.textContent = "See More";
      }
    });
  }

  return card;
}

// Load JSON
fetch("branches.json")
  .then((res) => res.json())
  .then((data) => {
    branchesData = data;
    renderBranches(branchesData);
  });

function renderBranches(branches) {
  const container = document.getElementById("branch-cards-overlay");
  container.innerHTML = "";
  branches.forEach((branch) => container.appendChild(createBranchCard(branch)));
}

// Search
document.getElementById("branch-search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = branchesData.filter((branch) => {
    const name = branch.name.toLowerCase();
    const municipality = branch.municipality.toLowerCase();
    const district = branch.district.toLowerCase();
    const coverage = branch.coverage.join(" ").toLowerCase();
    return (
      name.includes(query) ||
      municipality.includes(query) ||
      district.includes(query) ||
      coverage.includes(query)
    );
  });
  renderBranches(filtered);
});
