import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Carro } from '../modelos/Carro';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public carros: Carro[];

  constructor(public http:HttpClient,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController){
  }
  
  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message:'Aguarde enquanto os carros são carregados...'
    });

    await loading.present();

    this.http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos')
    .subscribe(
      (carros)=>{
        this.carros = carros;
      },
      async (err: HttpErrorResponse)=>{
        console.log('Deu erro ' + err.status);
        const al = await this.alertCtrl.create({
          header:'Erro!',
          message: 'Erro ao listar carros',
          buttons: [{text: 'OK'}]
        });

        await al.present();
      }
    ).add(
      ()=>{
        loading.dismiss();
      }
    )
  }
}
