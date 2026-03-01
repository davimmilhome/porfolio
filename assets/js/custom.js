document.addEventListener("DOMContentLoaded", () => {
  // Atualizar ano no footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Adicionar funcionalidade de expandir descrições dos projetos
  // Não aplicar em textos-grid
  const projectDescs = document.querySelectorAll(".projects-grid:not(.textos-grid) .project-desc");
  
  projectDescs.forEach(desc => {
    const projectBody = desc.closest(".project-body");
    if (!projectBody) return;

    // Criar botão de expandir
    const expandBtn = document.createElement("button");
    expandBtn.className = "expand-btn";
    expandBtn.textContent = "Ver mais";
    expandBtn.setAttribute("aria-expanded", "false");
    expandBtn.style.display = "none";

    // Inserir botão após a descrição
    desc.after(expandBtn);

    // Verificar se o texto está truncado
    const checkIfTruncated = () => {
      const isOverflowing = desc.scrollHeight > desc.offsetHeight;
      expandBtn.style.display = isOverflowing ? "block" : "none";
    };

    // Verificar após loading das imagens
    setTimeout(checkIfTruncated, 100);
    window.addEventListener("load", checkIfTruncated);

    // Adicionar comportamento de clique
    expandBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = desc.classList.contains("expanded");
      
      if (isExpanded) {
        desc.classList.remove("expanded");
        expandBtn.textContent = "Ver mais";
        expandBtn.setAttribute("aria-expanded", "false");
      } else {
        desc.classList.add("expanded");
        expandBtn.textContent = "Ver menos";
        expandBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
});