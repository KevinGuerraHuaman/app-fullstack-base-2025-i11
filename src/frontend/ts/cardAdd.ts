

class CardAdd {
    private modal: any;
    private form: HTMLFormElement | null;
    private cardDB: any;

    constructor() {
        this.form = document.getElementById('formAgregar') as HTMLFormElement;
        this.cardDB = new (window as any).CardDB();
        this.initModal();
        this.attachEventListeners();
    }

    private initModal(): void {
        // Inicializar modal de Materialize
        const modalElement = document.getElementById('modalAgregar');
        if (modalElement) {
            // @ts-ignore
            this.modal = M.Modal.init(modalElement);
            
            // Inicializar select de Materialize
            // @ts-ignore
            M.FormSelect.init(document.querySelectorAll('#modalAgregar select'));
        }
    }

    private attachEventListeners(): void {
        // Botón "Agregar Sensor"
        const btnAgregar = document.getElementById('btnAgregarSensor');
        if (btnAgregar) {
            btnAgregar.addEventListener('click', () => {
                this.openModal();
            });
        }

        // Formulario de agregar
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    private openModal(): void {
        // Limpiar formulario
        if (this.form) {
            this.form.reset();
            // Reinicializar labels de Materialize
            // @ts-ignore
            M.updateTextFields();
        }
        
        if (this.modal) {
            this.modal.open();
        }
    }

    private async handleSubmit(): Promise<void> {
        if (!this.form) return;

        const formData = new FormData(this.form);
        const deviceData = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            tipo: parseInt(formData.get('tipo') as string),
            valor: parseFloat(formData.get('valor') as string),
            iconMate: formData.get('iconMate') as string || 'device_unknown'
        };

        try {
            const response = await fetch('/devices/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deviceData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el dispositivo');
            }

            const result = await response.json();
            
            // Cerrar modal
            if (this.modal) {
                this.modal.close();
            }

            // Recargar las cards para mostrar el nuevo dispositivo
            await this.cardDB.loadDevices();

            // Mostrar mensaje de éxito
            // @ts-ignore
            M.toast({html: 'Sensor agregado exitosamente', classes: 'green'});

        } catch (error) {
            console.error('Error:', error);
            // @ts-ignore
            M.toast({html: 'Error al agregar el sensor', classes: 'red'});
        }
    }
}

(window as any).CardAdd = CardAdd;