import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosService],
    });

    service = TestBed.inject(PhotosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of photos', () => {
    const page = 1;
    const perPage = 24;
    const mockPhotos = [
      {
        id: '1',
        author: 'John Doe',
        width: 100,
        height: 100,
        url: 'test',
        download_url: 'test',
      },
      {
        id: '2',
        author: 'Jane Doe',
        width: 200,
        height: 200,
        url: 'test',
        download_url: 'test',
      },
    ];

    service.getPhotos(page, perPage).subscribe((photos) => {
      expect(photos).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}?page=${page}&limit=${perPage}`,
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockPhotos);
  });
});
