import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { DataService } from 'src/shared/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    dataService = TestBed.inject(DataService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(
      `User is: ${component.user.name}`
    );
  });

  it('should not display the user name if user is not logged in', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(
      `Please log in first`
    );
  });

  it('should not fetch data successfully if not called asynchronously', () => {
    // SpyOn informs us whenever getDetails is executed and we return our own value
    // instead of the return value from the actual method.
    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Data')
    );
    fixture.detectChanges();
    expect(component.data).toEqual('');
  });

  // We wait For Async and...
  // spyOn informs us whenever getDetails is executed and we return our own fake
  // value instead of the return value from the actual asynchronous method call.
  // Note that this runs synchronously as we did not wait 1.5s.
  it(
    'should fetch data successfully if called asynchronously: waitForAsync',
    waitForAsync(() => {
      // spyOn informs us whenever getDetails is executed...
      const spy = spyOn(dataService, 'getDetails').and.returnValue(
        // the fake value that we resolve
        Promise.resolve('Data')
      );
      fixture.detectChanges();
      // wait for all asynchronous tasks to finish
      fixture.whenStable().then(() => {
        expect(component.data).toEqual('Data');
      });
    })
  );

  // We fake Async and we return our own fake value instead of the return value from
  // the actual asynchronous method call.
  // Note that this runs synchronously as we did not wait 1.5s.
  it('should fetch data successfully if called asynchronously: fakeAsync', fakeAsync(() => {
    // spyOn informs us whenever getDetails is executed...
    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      // the fake value that we resolve
      Promise.resolve('Data')
    );
    fixture.detectChanges();
    // executing tick in a fakeAync zone simulates the passage of time...
    // in this case with no argument it finishes all async tasks immediately
    tick();
    expect(component.data).toEqual('Data');
  }));
});
