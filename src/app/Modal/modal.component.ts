import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() supermercadoEdit: any = {};
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();

  close(): void {
    this.closeModal.emit();
  }

  submitForm(): void {
    this.saveChanges.emit(this.supermercadoEdit);
  }
}
