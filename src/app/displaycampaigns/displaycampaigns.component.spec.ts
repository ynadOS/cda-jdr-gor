import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycampaignsComponent } from './displaycampaigns.component';

describe('DisplaycampaignsComponent', () => {
  let component: DisplaycampaignsComponent;
  let fixture: ComponentFixture<DisplaycampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaycampaignsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaycampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
