

class CardEdit implements EventListenerObject {
  handleEvent(object: Event): void {
    const btn = object.target as HTMLElement;
    
    if (btn.classList.contains("btnEditar")) {
      const card = btn.closest('.card');
      if (!card) return;

      const id = btn.dataset.id?.replace('sensor_', '') || '';
      const nombre = card.querySelector('.card-title')?.textContent?.trim() || '';
      const descripcion = card.querySelector('.card-description p')?.textContent?.trim() || '';

      (document.getElementById('editId') as HTMLInputElement).value = id;
      (document.getElementById('editNombre') as HTMLInputElement).value = nombre;
      (document.getElementById('editDescripcion') as HTMLInputElement).value = descripcion;

      // @ts-ignore
      M.updateTextFields();
      // @ts-ignore
      const modal = M.Modal.getInstance(document.getElementById('modalEditar'));
      modal.open();
    }
  }

  public attachEditListeners(): void {
    const editButtons = document.querySelectorAll('.btnEditar');
    editButtons.forEach(button => {
      button.addEventListener('click', this);
    });
  }
}

// Exponer globalmente
(window as any).CardEdit = CardEdit;