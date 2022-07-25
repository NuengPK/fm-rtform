import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reactive Form Example';
  genders = ['male', 'female'];
  signupForm!: FormGroup
  forbiddenUsernames = ['Bobby', 'Susan'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required,this.forbiddenName.bind(this)]),
          'email': new FormControl(null, [Validators.required,Validators.email]),
        }),
        'gender': new FormControl('male',Validators.required),
        'hobbies': new FormArray([])
      })
      console.log(this.signupForm)
  }
  onSubmit(){
    console.log(this.signupForm)
  }
  onAddHobby(){
    const controls = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(controls);
  }
  get controls() {
    return(this.signupForm.get('hobbies') as FormArray).controls;
  }
  forbiddenName(control: FormControl): {[s: string] : boolean} | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
