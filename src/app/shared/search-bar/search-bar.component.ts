import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  // $('#search-link').click((event)=> {
  //   event.stopPropagation();
  //   $('#modal-search').toggleClass('hidden').toggleClass('block');
  // });

  // $('#modal-search').click((event)=> {
  //   event.stopPropagation();
  //   $('#modal-search').toggleClass('hidden').toggleClass('block');
  //   if($('#modal-card').hasClass('block')){
  //     $('#modal-card').toggleClass('hidden').toggleClass('block');
  //   }
  //   if($('#modal-fav').hasClass('block')){
  //     $('#modal-fav').toggleClass('hidden').toggleClass('block');
  //   }
  // });
  // $('#search-box').click((event)=> {
  //   event.stopPropagation();
  // });
}
