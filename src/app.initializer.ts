import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleService } from './modules/user/services/role-insert.service';
import { InserTopicService } from './modules/topics/services/topic-insert.service';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly topicService: InserTopicService,
  ) {}

  async onModuleInit() {
    await this.topicService.insertTopic();
    await this.roleService.insertRoles();
  }
}
