# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from logging import Handler, LogRecord
from typing import Callable


class JobLogHandler(Handler):
    def __init__(self, log_sink: Callable[[str], None]) -> None:
        super().__init__()
        self.log_sink = log_sink

    def emit(self, record: LogRecord) -> None:
        msg = self.format(record)
        self.log_sink(msg)
