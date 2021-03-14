import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createConnection, getRepository } from 'typeorm';
import { ElectronService } from '../electron/electron.service';
import { SettingsService } from '../settings/settings.service';
import { DocumentHistory } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private inited = false;

  // connection: Promise<Connection>;
  // history_repo: Repository<DocumentHistory>;

  history$ = new Subject<DocumentHistory[]>();

  constructor(
    private electron: ElectronService,
    private settings: SettingsService
  ) {
    console.log('HistoryService');
    this.history$.next([]);
  }

  async init(): Promise<void> {
    if (this.inited) return;
    console.log('HistoryService initing...');
    const dataPath = this.settings.dataPath;
    console.log(dataPath);
    try {
      await createConnection({
        name: 'default',
        type: 'better-sqlite3',
        database: dataPath,
        synchronize: true,
        entities: [DocumentHistory],
        logging: 'all'
      });
      this.inited = true;
      // this.history_repo = this.connection.getRepository(History);
      // await this.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async allHistory(count = 10): Promise<DocumentHistory[]> {
    await this.init();
    console.log('HistoryService all');
    return await getRepository(DocumentHistory).find({
      order: {
        lastopen: 'DESC'
      },
      take: count
    });
    // return this.connection.then((conn) => {
    //   return conn.createQueryBuilder<History>(History, 'history')
    //     .createQueryBuilder<History[]>('all history')
    //     .orderBy('lastopen', 'DESC')
    //     .take(count)
    //     .getMany();
    // });

  }

  async refresh(): Promise<void> {
    await this.init();
    console.log('HistoryService refresh');
    const result = await getRepository(DocumentHistory).find({
      order: {
        lastopen: 'DESC'
      },
      take: 10
    });
    // const result = await this.history_repo
    //   .createQueryBuilder('all history')
    //   .orderBy('lastopen', 'DESC')
    //   .take(10)
    //   .getMany();
    this.history$.next(result);
  }

  async addHistory(filepath: string): Promise<void> {
    await this.init();
    console.log('HistoryService add');
    const old_history = await getRepository(DocumentHistory).findOne({
      where: {
        filepath
      }
    });
    if (old_history) {
      // old_history.lastopen = new Date();
      await getRepository(DocumentHistory).update({ filepath }, { lastopen: new Date() });
      // await this.connection.then((conn) => {
      //   conn.createQueryBuilder<History>(History, 'history')
      //     .update()
      //     .set(old_history);
      // });
      // await this.history_repo.save(old_history);
    } else {
      const history = new DocumentHistory();
      history.filepath = filepath;
      history.filename = this.electron.path.basename(filepath);
      history.lastopen = new Date();
      await getRepository(DocumentHistory).save(history);
    }
    await this.refresh();
  }

  async removeHistory(filepath: string): Promise<void> {
    await this.init();
    console.log('HistoryService remove');
    const history = await getRepository(DocumentHistory).findOne({ filepath });
    if (history) {
      await getRepository(DocumentHistory).remove(history);
    }
    await this.refresh();
  }

}
