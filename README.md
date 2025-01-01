# seer-interfaces 
（这个项目还没有完全定型）

该项目定义了一些赛尔号第三方工具会用到的 TS 接口，具体实现详见[`examples`](./examples/)目录。

## 目前都有什么？
- 可序列化的精灵，刻印，套装接口以及相应的 ProtocolBuffer 定义（这相当于实现了炉石传说中的“卡组代码”功能），详见[`examples/petinfo2protobuf`](./examples/petinfo2protobuf/)
- 可序列化的 BP 流程接口
- 精灵配置验证规则接口 ~~妈妈再也不用担心举办怀旧赛时有人作弊辣！~~