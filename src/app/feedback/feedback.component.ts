import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import * as emailjs from 'emailjs-com';

interface BrowserDetails {
  name: string;
  version: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  @ViewChild('capture', { static: false })
  capture!: ElementRef;

  img: any;
  imgData: any;
  closeResult: string = '';
  browserDetailsData: BrowserDetails = {
    name: '',
    version: '',
  };

  constructor(private modalService: NgbModal) {}

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
      
    this.sendEmail();

      // document.body.appendChild(this.img);
    });

    // Print browser details
    this.browserDetailsData = this.getBrowserDetails();
  }

  sendEmail() {
    
    const imageData = this.imgData.split(',')[1];
    const params = {
      from_name: "PushpenderSingh",
      to_name: 'pushpender.singh@geminisolutions.com',
      subject: "test mail",
      message: imageData,
    };
    // emailjs.send('service_y62ffza', 'template_xl6lj2a', params, 'iIhenH2o1lAQgHxyD')
    //   .then(() => {
    //     alert('Email sent!');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert('Error sending email.');
    //   });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
