import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  detailsForm!: FormGroup;
  specialCharacter: string[] = ['#', '@', '&', '$', '*'];

  ngOnInit() {
    this.detailsForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.validateName.bind(this),
      ]),
      userage: new FormControl('', [
        Validators.required,
        this.validateAge.bind(this),
      ]),
      useraddress: new FormControl(''),
      userzip: new FormControl('', [
        Validators.required,
        this.validateZip.bind(this),
      ]),
    });
  }

  checkIfOnlyNumber(value: any) {
    const allChars = value.split('');
    let isOnlyNumbers = true;
    for (let i = 0; i < allChars.length; i++) {
      console.log('allChars', allChars[i], parseInt(allChars[i]), Number.isNaN( parseInt(allChars[i]) ))
      if (Number.isNaN( parseInt(allChars[i]) ) || typeof parseInt(allChars[i]) !== 'number') {
        isOnlyNumbers = false;
        break;
      }
    }
    console.log('is number', isOnlyNumbers)
    return isOnlyNumbers;
  }

  validateZip(control: FormControl): { [s: string]: boolean } | null {
    if (this.checkIfOnlyNumber(control.value)) {
      return null;
    }
    console.log(
      'zip value is',
      control.value,
      this.checkIfOnlyNumber(control.value)
    );
    return { invalid: true };
  }

  validateName(control: FormControl): { [s: string]: boolean } | null {
    let validationResult: { [s: string]: boolean } | null = null;
    if (control.value.indexOf(' ') > -1) {
      return { invalid: true };
    }

    for (let i = 0; i < this.specialCharacter.length; i++) {
      console.log(this.specialCharacter[i], " ---- ", this.specialCharacter)
      if (control.value.indexOf(this.specialCharacter[i]) > -1) {
        validationResult = { invalid: true };
        break;
      }
    }

    console.log('control', control.value, control.value.indexOf(' ') > -1, validationResult);
    return validationResult;
  }

  validateAge(control: FormControl): { [s: string]: boolean } | null {
    if (this.checkIfOnlyNumber(control.value)) {
      if (+control.value < 18) {
        return { invalid: true };
      } else
      return null;
    } else {
      return { invalid: true };
    }
  }

  onSubmit() {
    console.log('data is submitted');
  }
}
