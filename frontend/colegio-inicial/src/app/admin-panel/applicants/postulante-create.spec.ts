import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteCreate } from './postulante-create';

describe('PostulanteCreate', () => {
  let component: PostulanteCreate;
  let fixture: ComponentFixture<PostulanteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulanteCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
