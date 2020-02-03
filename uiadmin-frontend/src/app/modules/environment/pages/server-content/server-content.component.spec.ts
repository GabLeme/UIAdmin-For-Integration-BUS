import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerContentComponent } from './server-content.component';

describe('ServerContentComponent', () => {
  let component: ServerContentComponent;
  let fixture: ComponentFixture<ServerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
