

class CardSlider {

  public attachSliderListeners(): void {
    const sliders = document.querySelectorAll('.range-field input[type="range"]');
    sliders.forEach(slider => {
      slider.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const card = target.closest('.card');
        if (!card) return;
        const valueSpan = card.querySelector('.control-value');
        if (valueSpan) {
          valueSpan.textContent = Math.round(parseFloat(target.value) * 100) + '%';
        }
      });

      // Actualización en la base de datos al soltar el slider
      slider.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const id = target.getAttribute('data-id');
        const value = parseFloat(target.value);
        if (id) {
          this.updateDeviceValue(id, value);
        }
      });
    });

    // Switches
    const switches = document.querySelectorAll('input[type="checkbox"][data-id]');
    switches.forEach(sw => {
      sw.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const id = target.getAttribute('data-id');
        const value = target.checked ? 1 : 0;
        if (id) {
          this.updateDeviceValue(id, value);
        }
      });
    });
  

  }
  async updateDeviceValue(id: string, value: number) {
    try {
      const response = await fetch(`/devices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: value })
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el valor');
      }
      // alerta
    } catch (err) {
      console.error(err);


    }
  }

}

// Exponer globalmente
(window as any).CardSlider = CardSlider;