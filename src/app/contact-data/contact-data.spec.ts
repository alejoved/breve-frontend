import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactData } from './contact-data';

describe('ContactData', () => {
  let component: ContactData;
  let fixture: ComponentFixture<ContactData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
