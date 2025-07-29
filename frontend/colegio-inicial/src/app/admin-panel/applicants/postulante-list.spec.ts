import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteList } from './postulante-list';

describe('PostulanteListComponent', () => {
  let component: PostulanteList;
  let fixture: ComponentFixture<PostulanteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulanteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
