import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecampaignpageComponent } from './createcampaignpage.component';

describe('CreatecampaignpageComponent', () => {
  let component: CreatecampaignpageComponent;
  let fixture: ComponentFixture<CreatecampaignpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecampaignpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecampaignpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
