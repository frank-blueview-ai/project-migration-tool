# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai


from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Iterable, List, Callable
import threading


def run_in_parallel(
    items: Iterable[Path],
    func: Callable[[Path], None],
    max_workers: int,
    progress_callback: Callable[[int], None] | None = None,
    cancel_event: threading.Event | None = None,
) -> List[Path]:
    items_list = list(items)
    # If cancelled before starting
    if cancel_event and cancel_event.is_set():
        return []

    total = len(items_list)
    processed = 0

    def _mark_done():
        nonlocal processed
        processed += 1
        if progress_callback:
            progress_callback(processed)

    if max_workers <= 1 or len(items_list) <= 1:
        for i in items_list:
            if cancel_event and cancel_event.is_set():
                break
            func(i)
            _mark_done()
        return items_list

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {}
        for i in items_list:
            if cancel_event and cancel_event.is_set():
                break
            futures[executor.submit(func, i)] = i
            
        for _ in as_completed(futures):
            _mark_done()

    return items_list
