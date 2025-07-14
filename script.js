const ramos = [
  { codigo: "QYF-111", nombre: "Química General I", requisitos: [] },
  { codigo: "QYF-112", nombre: "Biología Celular y Molecular", requisitos: [] },
  { codigo: "QYF-113", nombre: "Morfología Humana I", requisitos: [] },
  { codigo: "QYF-114", nombre: "Matemática I", requisitos: [] },
  { codigo: "QYF-121", nombre: "Química General II", requisitos: ["QYF-111"] },
  { codigo: "QYF-124", nombre: "Matemática II", requisitos: ["QYF-114"] },
  { codigo: "QYF-122", nombre: "Bioquímica General y Molecular", requisitos: ["QYF-112"] },
  { codigo: "QYF-212", nombre: "Química Orgánica I", requisitos: ["QYF-121"] },
  { codigo: "QYF-213", nombre: "Farmacología I", requisitos: ["QYF-122"] },
  { codigo: "QYF-214", nombre: "Bioestadística", requisitos: ["QYF-124"] },
  { codigo: "QYF-215", nombre: "Fisicoquímica", requisitos: ["QYF-121", "QYF-125"] },
  { codigo: "QYF-125", nombre: "Física aplicada", requisitos: ["QYF-114"] },
  { codigo: "QYF-221", nombre: "Análisis Instrumental", requisitos: ["QYF-215", "QYF-211"] },
  { codigo: "QYF-211", nombre: "Qca. Analítica", requisitos: ["QYF-121"] },
  // Puedes seguir agregando aquí el resto según el PDF...
];

let aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.dataset.codigo = ramo.codigo;
    div.textContent = ramo.nombre;

    if (!requisitosCumplidos(ramo)) {
      div.classList.add("bloqueado");
    }

    if (aprobados.has(ramo.codigo)) {
      div.classList.remove("bloqueado");
      div.classList.add("aprobado");
    }

    div.onclick = () => {
      if (!requisitosCumplidos(ramo)) return;

      if (aprobados.has(ramo.codigo)) {
        aprobados.delete(ramo.codigo);
      } else {
        aprobados.add(ramo.codigo);
      }

      crearMalla();
    };

    contenedor.appendChild(div);
  });
}

function requisitosCumplidos(ramo) {
  return ramo.requisitos.every(req => aprobados.has(req));
}

crearMalla();

