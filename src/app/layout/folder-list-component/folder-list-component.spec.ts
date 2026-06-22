import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListComponent } from './folder-list-component';

describe('FolderListComponent', () => {
  let component: FolderListComponent;
  let fixture: ComponentFixture<FolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
