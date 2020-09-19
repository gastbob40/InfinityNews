import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsgroupThreadItemComponent } from './newsgroup-thread-item.component';

describe('NewsgroupThreadItemComponent', () => {
  let component: NewsgroupThreadItemComponent;
  let fixture: ComponentFixture<NewsgroupThreadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsgroupThreadItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsgroupThreadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
