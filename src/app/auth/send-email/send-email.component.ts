import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers: [AuthService],
})
export class SendEmailComponent {
  public user$: Observable<any> = this.authService.afAuth.user;
  public showClass: boolean = false;
  constructor(private authService: AuthService) { }

  onSendEmail(): void {
    this.authService.sendEmailVerification();
    this.showClass = true;
  }
}
