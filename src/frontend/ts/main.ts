// Inicialización
window.addEventListener("load", async () => {
  // @ts-ignore
  M.Modal.init(document.querySelectorAll('.modal'));

  // @ts-ignore - Acceder a las clases globalmente
  const deleteManager = new (window as any).CardDelete();
  deleteManager.attachDeleteListeners();
  
  // @ts-ignore
  const editManager = new (window as any).CardEdit();
  editManager.attachEditListeners();
  
  // @ts-ignore
  const sliderManager = new (window as any).CardSlider();
  sliderManager.attachSliderListeners();

  const cardDB = new (window as any).CardDB();
  await cardDB.loadDevices();

  const cardAdd = new (window as any).CardAdd();
  

});

// Inicializar el formulario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  const formHandler = new (window as any).CardEditSendDB();
  formHandler.initEditForm();
});