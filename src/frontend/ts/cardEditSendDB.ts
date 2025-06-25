
class CardEditSendDB {
  public initEditForm(): void {
    const form = document.getElementById('formEditar');
    if (form) {
      form.addEventListener('submit', this.handleEditFormSubmit);
    }
  }

  private handleEditFormSubmit(e: Event): void {
    e.preventDefault();

    const id = (document.getElementById('editId') as HTMLInputElement).value;
    const nombre = (document.getElementById('editNombre') as HTMLInputElement).value;
    const descripcion = (document.getElementById('editDescripcion') as HTMLInputElement).value;

    fetch(`/devices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, description: descripcion })
    })
    .then(res => {
      if (res.ok) {
        const card = document.querySelector(`[data-id="sensor_${id}"]`)?.closest('.card');
        if (card) {
          card.querySelector('.card-title')!.textContent = nombre;
          card.querySelector('.card-description p')!.textContent = descripcion;
        }
        // @ts-ignore
        M.Modal.getInstance(document.getElementById('modalEditar')).close();
      } else {
        alert('Error al actualizar');
      }
    })
    .catch(() => alert('Error de conexión'));
  }
}

// Exponer globalmente
(window as any).CardEditSendDB = CardEditSendDB;