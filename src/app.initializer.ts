import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleService } from './modules/user/services/role-insert.service';
import { InserTopicService } from './modules/topics/services/topic-insert.service';
import { InserUserService } from './modules/user/services/user-insert.service';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly topicService: InserTopicService,
    private readonly userService: InserUserService,
  ) {}

  async onModuleInit() {
    await this.roleService.insertRoles();
    await this.topicService.insertTopic();
    await this.userService.insertUser();
  }
}
