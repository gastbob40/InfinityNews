import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsgroupThreadPageComponent } from './newsgroup-thread-page.component';

describe('NewsgroupThreadPageComponent', () => {
  let component: NewsgroupThreadPageComponent;
  let fixture: ComponentFixture<NewsgroupThreadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsgroupThreadPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsgroupThreadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
