import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="brand">Task Manager</div>
      <ul class="nav-links">
        <li><a routerLink="/tasks" routerLinkActive="active">Tasks</a></li>
        <li><a routerLink="/calendar" routerLinkActive="active">Calendar</a></li>
      </ul>
    </nav>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      background: #343a40;
      color: white;
      padding: 1rem 2rem;
      
      .brand { font-size: 1.5rem; font-weight: bold; margin-right: 2rem; }
      
      .nav-links {
        list-style: none;
        display: flex;
        gap: 15px;
        margin: 0;
        padding: 0;
        
        a { color: #ccc; text-decoration: none; }
        a:hover, a.active { color: white; }
      }
    }
    .content { padding: 2rem; }
  `]
})
export class AppComponent {}
