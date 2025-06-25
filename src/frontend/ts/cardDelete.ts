

class CardDelete implements EventListenerObject {
  handleEvent(object: Event): void {
    const btn = object.target as HTMLElement;
    
    if (btn.classList.contains("btnEliminar")) {
      const id = btn.dataset.id?.replace('sensor_', '');
      if (id && confirm(`¿Eliminar ${id}?`)) {
        fetch(`/devices/${id}`, { method: 'DELETE' })
          .then(() => btn.closest('.col')?.remove());
      }
    }
  }

  public attachDeleteListeners(): void {
    const deleteButtons = document.querySelectorAll('.btnEliminar');
    deleteButtons.forEach(button => {
      button.addEventListener('click', this);
    });
  }
}

// Exponer globalmente
(window as any).CardDelete = CardDelete;