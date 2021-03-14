import { Component, EventEmitter, OnInit, Output, ViewChild, AfterContentInit, AfterViewInit, ApplicationRef, ViewRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ElectronService } from '../../core/services';
import { TabInfo, TabsManagerService } from '../services/tabs-manager/tabs-manager.service';

@Component({
  selector: 'app-document-viewer2',
  templateUrl: './document-viewer2.component.html',
  styleUrls: ['./document-viewer2.component.scss']
})
export class DocumentViewer2Component implements OnInit, AfterContentInit, AfterViewInit {

  session: TabInfo;

  src: string;


  constructor(
    private electron: ElectronService,
    private route: ActivatedRoute,
    private tabs: TabsManagerService,
    private router: Router,
    private app: ApplicationRef
  ) {

  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.session = this.tabs.getTab(params['session']);
      if (this.session === undefined) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      // this.docname = this.session.title;
      // this.time = new Date();
      this.src = this.loadFile(this.session.ref);
    });
  }

  loadFile(filepath: string): string {
    console.log(`load ${filepath}`);
    const buffer = this.electron.fs.readFileSync(filepath);
    const blob = new File([new Uint8Array(buffer)], this.electron.path.basename(filepath), { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }

}
