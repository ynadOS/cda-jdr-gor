import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMenuComponent } from './campaign-menu.component';

describe('CampaignMenuComponent', () => {
  let component: CampaignMenuComponent;
  let fixture: ComponentFixture<CampaignMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
