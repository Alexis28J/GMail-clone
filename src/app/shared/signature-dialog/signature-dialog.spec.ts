import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDialog } from './signature-dialog';

describe('SignatureDialog', () => {
  let component: SignatureDialog;
  let fixture: ComponentFixture<SignatureDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignatureDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SignatureDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
