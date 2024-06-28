import { Component,  EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AddsCardProps } from 'src/interfaces/AddCardProp.interface';

@Component({
  selector: 'adds-form',
  templateUrl: './adds-form.component.html',
  styleUrls: ['./adds-form.component.scss']
})
export class AddsFormComponent implements OnInit {
ngOnInit(): void {
  const storedUserInfo = localStorage.getItem('UserInfo');
  const userinfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  if (userinfo) {
    console.log(userinfo);

    const {IsMountlyPlan}=userinfo.plan;
    if (userinfo.addons) {
      const {Selected}=userinfo.addons;
      this.SelectedAdds=Selected?Selected:[];
    }
    this.MontlyPlan=IsMountlyPlan

}
}
@Output() ChangeStep=new EventEmitter<any>();
MontlyPlan!:boolean;
addsList: AddsCardProps[] = [
  { title: 'Online service', Montlyprice: '1',  info: 'Access to multiplayer games' },
  { title: 'Larger storage', Montlyprice: '2',  info: 'Extra 1TB of cloud save' },
  { title: 'Customizable profile', Montlyprice: '2',  info: 'Custom theme on your profile' },
];
SelectedAdds: AddsCardProps[] = [];
navigateNext() {
    this.ChangeStep.emit({
      PageNumber:3,
      data:{
        addons:{
          Selected:this.SelectedAdds
        }
    }
    });
}
SelectAdd(index: number, event: Event): void {
  const add = this.addsList[index];
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    if (!this.SelectedAdds.includes(add)) {
      this.SelectedAdds.push(add);
    }
  } else {
    this.SelectedAdds = this.SelectedAdds.filter(selectedAdd => selectedAdd.title !== add.title);
  }
}
GoBack(){
  this.ChangeStep.emit({
    PageNumber:1,
    data:{
      addons:{
        Selected:this.SelectedAdds
      }
  }
  });
}
getPrice(MondlyPrice:string){
  return this.MontlyPlan?parseFloat(MondlyPrice):parseFloat(MondlyPrice)*12;
}
isSelected(title:string):boolean{
  return this.SelectedAdds.some((add)=>add.title===title);
}
}
