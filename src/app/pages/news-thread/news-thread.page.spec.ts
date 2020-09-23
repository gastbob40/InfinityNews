import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsThreadPage } from './news-thread.page';

describe('NewsThreadPage', () => {
  let component: NewsThreadPage;
  let fixture: ComponentFixture<NewsThreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsThreadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
