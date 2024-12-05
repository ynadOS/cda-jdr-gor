import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Votre composant principal
import { NavbarComponent } from './navbar/navbar.component';  // Composant Navbar
import { HomeComponent } from './home/home.component';  // Composant Home
import { AboutComponent } from './about/about.component';  // Composant About (exemple)
import { RouterModule } from '@angular/router';  // Pour gérer le routage
import { routes } from './app.routes';  // Vos routes

@NgModule({
  declarations: [
    AppComponent,  // Déclarez tous vos composants ici
    NavbarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,  // Importez BrowserModule pour démarrer l'application Angular
    RouterModule.forRoot(routes)  // Configurez les routes
  ],
  providers: [],  // Vous pouvez ajouter des services ici si nécessaire
  bootstrap: [AppComponent]  // Déclarez le composant principal qui va démarrer l'application
})
export class AppModule { }
