
window.addEventListener("load", async () => {
  // @ts-ignore
  M.Modal.init(document.querySelectorAll('.modal'));

  // Inicializa el gestor de eliminación de tarjetas
  // @ts-ignore
  const deleteManager = new (window as any).CardDelete();
  deleteManager.attachDeleteListeners();
  
  // Inicializa el gestor de edición de tarjetas
  // @ts-ignore
  const editManager = new (window as any).CardEdit();
  editManager.attachEditListeners();
  
  // Inicializa el gestor de sliders/switches
  // @ts-ignore
  const sliderManager = new (window as any).CardSlider();
  sliderManager.attachSliderListeners();

  // Inicializa el gestor de base de datos de tarjetas
  const cardDB = new (window as any).CardDB();
  await cardDB.loadDevices();

  // Inicializa el gestor para agregar nuevas tarjetas
  const cardAdd = new (window as any).CardAdd();
  

});


// Inicializa las funciones
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  const formHandler = new (window as any).CardEditSendDB();
  formHandler.initEditForm();
});