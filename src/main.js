import { ChevronRight, createIcons } from "lucide";

createIcons({ icons: { ChevronRight } });

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  nav?.classList.toggle("is-open", !expanded);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const whatsappNumber = "551338780078";
const serviceModal = document.querySelector("#service-modal");
const scheduleModal = document.querySelector("#schedule-modal");
const scheduleForm = document.querySelector("#schedule-form");

const services = {
  transferencia: {
    title: "Vistoria de Transferência",
    image: new URL("../assets/service-transfer.jpg", import.meta.url).href,
    imageAlt: "Vistoria de transferência em veículo",
    scheduleValue: "Vistoria para Transferência",
    description:
      "A vistoria de transferência avalia a originalidade dos pontos de identificação veicular (chassi, motor, plaquetas e vidros) e as condições gerais dos equipamentos exigidos pelas normas vigentes. Trata-se de etapa indispensável para a emissão do novo Certificado de Registro do Veículo (CRV) em nome do comprador.",
  },
  infracao: {
    title: "Vistoria por Infração de Trânsito",
    image: new URL("../assets/service-id.jpg", import.meta.url).href,
    imageAlt: "Vistoria veicular por infração de trânsito",
    scheduleValue: "Vistoria por Infração de Trânsito",
    description:
      "A vistoria por infração de trânsito verifica os itens indicados pelo órgão de trânsito após uma autuação ou determinação administrativa. O procedimento confirma se as irregularidades foram corrigidas e se o veículo atende às exigências necessárias para sua regularização.",
  },
  cautelar: {
    title: "Vistoria Cautelar",
    image: new URL("../assets/service-regularizacao.jpeg", import.meta.url).href,
    imageAlt: "Realização de vistoria cautelar",
    scheduleValue: "Vistoria Cautelar",
    description:
      "A vistoria cautelar realiza uma análise detalhada da identificação, da estrutura e do histórico do veículo. O procedimento ajuda a identificar possíveis alterações, reparos relevantes ou inconsistências, trazendo mais segurança e transparência antes da compra ou venda.",
  },
};

let selectedService = services.transferencia.scheduleValue;

function closeOpenModal() {
  document.querySelector("dialog[open]")?.close();
}

function openSchedule(service = selectedService) {
  closeOpenModal();
  const typeField = scheduleForm?.elements.namedItem("tipo");
  if (typeField instanceof HTMLSelectElement) typeField.value = service;
  scheduleModal?.showModal();
}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = services[button.dataset.service];
    if (!service || !serviceModal) return;

    selectedService = service.scheduleValue;
    serviceModal.querySelector("#service-modal-title").textContent = service.title;
    serviceModal.querySelector(".service-modal-image").src = service.image;
    serviceModal.querySelector(".service-modal-image").alt = service.imageAlt;
    serviceModal.querySelector(".service-modal-description p").textContent = service.description;
    closeOpenModal();
    serviceModal.showModal();
  });
});

document.querySelectorAll("[data-open-schedule]").forEach((button) => {
  button.addEventListener("click", () => openSchedule());
});

document.querySelector("[data-service-schedule]")?.addEventListener("click", () => {
  openSchedule(selectedService);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
const dateField = scheduleForm?.elements.namedItem("data");
if (dateField instanceof HTMLInputElement) dateField.min = localToday;

scheduleForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!scheduleForm.reportValidity()) return;

  const data = new FormData(scheduleForm);
  const lines = [
    "Olá! Gostaria de agendar uma vistoria.",
    `Tipo: ${data.get("tipo")}`,
    `Modelo: ${data.get("modelo")}`,
  ];
  if (data.get("nome")) lines.push(`Nome: ${data.get("nome")}`);
  if (data.get("placa")) lines.push(`Placa: ${data.get("placa")}`);
  if (data.get("data")) {
    const [year, month, day] = String(data.get("data")).split("-");
    lines.push(`Data preferida: ${day}/${month}/${year}`);
  }

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
});
