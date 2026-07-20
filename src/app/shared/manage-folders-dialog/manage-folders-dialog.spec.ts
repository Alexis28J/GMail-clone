import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFoldersDialog } from './manage-folders-dialog';

describe('ManageFoldersDialog', () => {
  let component: ManageFoldersDialog;
  let fixture: ComponentFixture<ManageFoldersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFoldersDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageFoldersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
