import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeTo(country: Country) {
    this.router.navigate(['country', country.nome_pais_int])
  }

}
