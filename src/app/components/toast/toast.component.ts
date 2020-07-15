import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  
    @Input() public successMessage: string;
    @Input() public errorMessage: string;
    @Input() public assistiveText: string;
    @Input() public header: string;
    @Input() public detail: string;
    @Input() public action: string;
    @Input() public state: string;

    constructor() {}

    public showToast(type: string) {
        
    }

    public closeToast() {

    }
}