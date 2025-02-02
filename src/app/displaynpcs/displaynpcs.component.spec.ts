import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaynpcsComponent } from './displaynpcs.component';

describe('DisplaynpcsComponent', () => {
  let component: DisplaynpcsComponent;
  let fixture: ComponentFixture<DisplaynpcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaynpcsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaynpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
