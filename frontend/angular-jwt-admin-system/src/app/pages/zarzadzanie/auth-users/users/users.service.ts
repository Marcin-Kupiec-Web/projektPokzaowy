import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/systemApp/restControllerAppUs';
  }

  public findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/getUsers');
  }

  public findByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/findUser/' + name);
  }
  public findById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/findUserId/' + id);
  }
  public updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl + '/updateUsers', user);
  }
  public addUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl + '/addUsers', user);
  }

  public removeUser(user: User): Observable<any> {
    return this.http.delete(this.usersUrl + '/deleteUsers' + '/' + user.id);
  }


}
