import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Studentclass } from './studentclass';
import { CommonModule } from '@angular/common';
import { StudentserviceService } from './studentservice.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'studentcrud';
  data:Studentclass[]=[];
 addbtn: boolean = true;
  updateBtn: boolean = false;
  editid: number = 0;

  constructor(private ser:StudentserviceService){
    this.loaddata()
    console.log(this.data)
  }
  loaddata(){
    this.ser.getAll().subscribe((val)=>{
      this.data=val;
    })
  }

studForm = new FormGroup({
      id: new FormControl(0),

  name: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  mob: new FormControl('', Validators.required),
  adress: new FormControl('', Validators.required),
  city: new FormControl('', Validators.required),
  pincode: new FormControl('', Validators.required)
});


saveData() {
  console.log(this.studForm.value);
}
  // addnew() {
  //   const newStudent: Studentclass = {
  //     id: 0,
  //     name: this.studForm.get('name')?.value || '',
  //     email: this.studForm.get('email')?.value || '',
  //     mob: this.studForm.get('mob')?.value || '',
  //     adress: this.studForm.get('adress')?.value || '',
  //     city: this.studForm.get('city')?.value || '',
  //     pincode: this.studForm.get('pincode')?.value || ''
  //   };
  //   this.ser.addstud(newStudent).subscribe(res=>
  //    {  
  //       alert('Added successfully');
  //       // update local list (either push or reload)
  //       this.data.push(res);
  //       // reset form
  //       this.studForm.reset();
  //     },
  //     err=>
  //     {
  //       alert("not added succefully")
  //     })
  // }
  addnew() {

    const newStudent = this.studForm.value;

    this.ser.addstud(newStudent as Studentclass).subscribe({
      next: (res) => {
        alert('Add Successfully!');
        this.data.push(res);   // list me add
        this.studForm.reset(); 
      },
      error: () => {
        alert('Not Added Successfully!');
      }
    });
  }
  
  // ----------------------- EDIT -----------------------
  edit(id: number) {
    this.addbtn = false;
    this.updateBtn = true;
    this.editid = id;

    // data array se load karna
    const stud = this.data.find(x => x.id === id);

    if (stud) {
      this.studForm.patchValue({
        id: stud.id,
        name: stud.name,
        email: stud.email,
        mob: stud.mob,
        adress: stud.adress,
        city: stud.city,
        pincode: stud.pincode
      });
    }
  }

  // ----------------------- UPDATE -----------------------
  updatedata() {
    const updated = this.studForm.value as Studentclass;

    this.ser.updatestud(this.editid, updated).subscribe(res => {
      alert("Updated Successfully!");

      const index = this.data.findIndex(x => x.id === this.editid);
      this.data[index] = res;

      this.studForm.reset();
      this.addbtn = true;
      this.updateBtn = false;
    });
  }

  // ----------------------- DELETE -----------------------
  delete(id: number) {
    this.ser.deleteStudent(id).subscribe(() => this.loaddata());
  }
}
