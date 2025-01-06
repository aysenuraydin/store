import { Component } from '@angular/core';

@Component({
  selector: 'add-fav',
  templateUrl: './add-fav.component.html',
  styleUrl: './add-fav.component.css'
})
export class AddFavComponent {
  // $('#fav-button').click(()=> {
  //   $('#modal-fav').toggleClass('hidden').toggleClass('block');
  // });
  // $('#fav-link').click((event)=> {
  //   event.stopPropagation();
  //   $('#modal-fav').toggleClass('hidden').toggleClass('block');
  //   $('#fav-link i').toggleClass('fa-solid').toggleClass('fa-regular');
  //   if($('#modal-card').hasClass('block')){
  //     $('#modal-card').toggleClass('hidden').toggleClass('block');
  //   }
  // });
  // $('.fav-blur').click((event)=> {
  //   event.stopPropagation();
  //   $('#modal-fav').toggleClass('hidden').toggleClass('block');
  //   if($('#fav-link i').hasClass('fa-solid')){
  //     $('#fav-link i').toggleClass('fa-solid').toggleClass('fa-regular');
  //   }
  // });
}
