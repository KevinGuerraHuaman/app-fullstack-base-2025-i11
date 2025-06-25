
class CardDB {
    private apiUrl: string = '/devices/';
    private container: HTMLElement | null = null;

    constructor() {
        this.container = document.getElementById('tarjetas-contenedor');
    }

    
    async loadDevices(): Promise<void> {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const devices = await response.json();
            this.renderDevices(devices);

            
            this.reinitializeEventListeners();

        } catch (error) {
            console.error('Error al cargar dispositivos:', error);
            this.showError('Error al cargar los dispositivos');
        }
    }

    private renderDevices(devices: any[]): void {
        if (!this.container) {
            console.error('Contenedor de tarjetas no encontrado');
            return;
        }

        this.container.innerHTML = '';

        devices.forEach(device => {
            const cardHtml = this.generateCardHtml(device);
            this.container!.innerHTML += cardHtml;
        });
    }


    private generateCardHtml(device: any): string {
        const cardColors = this.getCardColors(device.id);
        const iconHtml = this.getIconHtml(device.icon, cardColors.iconBg);
        const controlHtml = this.getControlHtml(device);

        return `
            <div class="col s12 m6 l4">
                <div class="card ${cardColors.cardClass}">
                    <div class="card-content">
                        ${iconHtml}
                        <span class="card-title">${device.name}</span>
                        <div class="card-description">
                            <p>${device.description}</p>
                        </div>
                        <div class="control-area">
                            ${controlHtml}
                        </div>
                    </div>
                    <div class="card-action">
                        <a class="waves-effect ${cardColors.btnClass} btn btnEditar" data-id="${device.id}" href="#">Editar</a>
                        <a class="waves-effect ${cardColors.btnClass} btn btnEliminar" data-id="${device.id}" href="#">Eliminar</a>
                    </div>
                </div>
            </div>
        `;
    }


    private getCardColors(id: number): { cardClass: string, iconBg: string, btnClass: string } {
        const colorSchemes = [
            { cardClass: 'amber lighten-3', iconBg: '#124580', btnClass: 'purple darken-2' },
            { cardClass: 'teal lighten-4', iconBg: '#43a047', btnClass: 'green darken-2' },
            { cardClass: 'deep-purple lighten-4', iconBg: '#6a1b9a', btnClass: 'deep-purple darken-2' },
            { cardClass: 'blue lighten-4', iconBg: '#124580', btnClass: 'blue darken-2' },
            { cardClass: 'pink lighten-4', iconBg: '#d81b60', btnClass: 'pink darken-2' },
            { cardClass: 'lime lighten-4', iconBg: '#afb42b', btnClass: 'lime darken-2' }
        ];

        return colorSchemes[(id - 1) % colorSchemes.length];
    }


    private getIconHtml(iconName: string, bgColor: string): string {
        return `<span class="icon-bg" style="background:${bgColor};"><i class="material-icons">${iconName}</i></span>`;
    }


    private getControlHtml(device: any): string {
        if (device.type === 1) {
    
            const percentage = Math.round(device.value * 100);
            return `
                <div class="range-field">
                    <input type="range" min="0" max="1" step="0.1" value="${device.value}" data-id="${device.id}" />
                </div>
                <span class="control-value">${percentage}%</span>
            `;
        } else {

            const checked = device.state === 1 ? 'checked' : '';
            return `
                <div class="switch">
                    <label>
                        Off
                        <input type="checkbox" ${checked} data-id="${device.id}">
                        <span class="lever"></span>
                        On
                    </label>
                </div>
            `;
        }
    }


    private reinitializeEventListeners(): void {
 
        if ((window as any).CardDelete) {
            const deleteManager = new (window as any).CardDelete();
            deleteManager.attachDeleteListeners();
        }

        if ((window as any).CardEdit) {
            const editManager = new (window as any).CardEdit();
            editManager.attachEditListeners();
        }

        if ((window as any).CardSlider) {
            const sliderManager = new (window as any).CardSlider();
            sliderManager.attachSliderListeners();
        }
    }

    private showError(message: string): void {
        if (this.container) {
            this.container.innerHTML = `
                <div class="col s12">
                    <div class="card red lighten-4">
                        <div class="card-content">
                            <span class="card-title red-text">Error</span>
                            <p>${message}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}


(window as any).CardDB = CardDB;
