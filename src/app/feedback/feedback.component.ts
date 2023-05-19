import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';

interface BrowserDetails {
  name: string;
  version: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  @ViewChild('capture', { static: false })
  capture!: ElementRef;

  img: any;
  imgData: any;
  closeResult: string = '';
  browserDetailsData: BrowserDetails = {
    name: '',
    version: '',
  };

  myForm: FormGroup;
  className: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private render: Renderer2
  ) {
    this.myForm = this.fb.group({
      mailTo: ['sanjay.bisht@geminisolutions.com'],
      cc: ['', Validators.required],
      comments: ['', Validators.required],
      browserData: [this.getBrowserDetails()],
      osData: [navigator.platform],
      image: [''],
    });
  }

  ngOnInit() {}

  getBrowserDetails(): BrowserDetails {
    const userAgent = navigator.userAgent;
    let name = '';
    let version = '';

    // Detect browser name and version
    if (userAgent.indexOf('Firefox') > -1) {
      name = 'Mozilla Firefox';
      const matches = userAgent.match(/Firefox\/([\d.]+)/);
      if (matches) {
        version = matches[1];
      }
    } else if (userAgent.indexOf('Chrome') > -1) {
      name = 'Google Chrome';
      const matches = userAgent.match(/Chrome\/([\d.]+)/);
      if (matches) {
        version = matches[1];
      }
    } else if (userAgent.indexOf('Edge') > -1) {
      name = 'Microsoft Edge';
      const matches = userAgent.match(/Edge\/([\d.]+)/);
      if (matches) {
        version = matches[1];
      }
    } else if (userAgent.indexOf('Safari') > -1) {
      name = 'Apple Safari';
      const matches = userAgent.match(/Safari\/([\d.]+)/);
      if (matches) {
        version = matches[1];
      }
    } else if (userAgent.indexOf('Trident') > -1) {
      name = 'Microsoft Internet Explorer';
      const matches = userAgent.match(/rv:([\d.]+)/);
      if (matches) {
        version = matches[1];
      }
    }

    return { name, version };
  }

  takeSs() {
    // Capture screenshot
    html2canvas(this.capture.nativeElement).then((canvas) => {
      this.imgData = canvas.toDataURL('image/png');
      this.img = new Image();
      this.img.src = this.imgData;
      this.img.onload = () => {
        this.img.style.height = 100 + '%';
        this.img.style.width = 100 + '%';
      };
      document.getElementById('imageArea')?.appendChild(this.img);

      this.myForm.patchValue({
        image: this.imgData,
      });
    });
  }

  async open(content: any) {
    await this.takeSs();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  sendData() {
    console.log(this.myForm.value);
  }

  highlight() {
    this.className = 'highlighted';
  }
  blackout() {
    this.className = 'blackout';
  }

  toggleHighlight(event: Event) {
    console.log(event);
    if (event) {
      let highlightClass = (event.target as HTMLElement).classList.contains(
        'highlighted'
      );
      let blackOutClass = (event.target as HTMLElement).classList.contains(
        'blackout'
      );

      if (this.className) {
        switch (this.className) {
          case 'highlighted':
            {
              if (highlightClass) {
                this.render.removeClass(event.target, this.className);
              } else this.render.addClass(event.target, this.className);
            }
            break;

          case 'blackout': {
            if (blackOutClass) {
              this.render.removeClass(event.target, this.className);
            } else this.render.addClass(event.target, this.className);
          }
        }
      }
    }
  }
}
