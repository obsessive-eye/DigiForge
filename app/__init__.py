import sys
import os
import importlib

# Add the backend/app directory to sys.path so that its subpackages can be imported.
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend", "app"))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Import the algorithms package from the backend app and expose it as a submodule of this package.
try:
    algorithms_pkg = importlib.import_module("algorithms")
    sys.modules[__name__ + ".algorithms"] = algorithms_pkg
except ImportError:
    # If the import fails, the tests will raise an error; this placeholder ensures the package exists.
    pass
